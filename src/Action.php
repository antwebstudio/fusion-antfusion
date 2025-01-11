<?php

namespace Addons\AntFusion;

use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class Action
{
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\HasHooks;
    use \Addons\AntFusion\Traits\HasRecords;
    use \Addons\AntFusion\Traits\EvaluatesClosures;

    protected $confirmButtonText;

    protected $name;

    protected $label;

    protected $handle;

    protected $standalone = false;

    protected $destructive = false;

    protected $primary = false;

    protected $hide = false;

    protected $dropdown = false;

    protected $component;

    protected $whenRecord;

    protected $callback;

    protected $successMessage = 'Action performed successfully.';

    protected $footerActions;

    protected $fillForm;

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    public function __construct($name = null)
    {
        $this->name = $name;
        
        $this->withMeta('syncDependantFieldUrl', function() {
            return route('antfusion.resource.sync_fields', ['resource' => $this->parent->getSlug()]);
        });
    }

    public function performAction($request)
    {
        $request->validate($this->getRules());

        if ($request->filled('resourceIds')) {
            $models = $this->parent->findByIds($request->resourceIds);
        } else if ($request->filled('records')) {
            // For datadatable bulk actions
            $models = $this->parent->findByIds($request->records);
        } else {
            // Some action not require records, eg: create action
            // throw ValidationException::withMessages(['*' => 'No records is selected. ']);
        }

        if ($request->from == 'ajax-modal') {
            $records = [];
            foreach ($models as $model) {
                $record = [];
                foreach ($this->fields() as $field) {
                    $record[$field->getHandle()] = $field->getState($model, $field->getHandle());
                }
                $records[] = $record;
            }

            return [
                'fields' => $this->convertFieldsToArray($this->fields()),
                'records' => $records,
            ];
        } else if ($request->child_action && $request->path == $this->getPath()) {
            $action = $this->getComponentBySlugFrom(Str::after($request->child_action, $request->path.'.'), $this->getFooterActions(), 'a');
            return $action->performAction($request);
        } else {
            return $this->handle($request, collect($models ?? []));
        }
    }

    public function findByIds($ids)
    {
        return $this->parent->findByIds($ids);
    }

    public function exceptShowInBulkAction() {
        return $this->exceptShowIn('bulk');
    }

    public function exceptOnIndex() {
        return $this->exceptShowIn('index');
    }

    public function onlyBulkAction()
    {
        return $this->exceptShowIn('inline');
    }

    public function debug()
    {
        return $this->withMeta(['debug' => true]);
    }

    public function newVersion()
    {
        return $this->withMeta(['newVersion' => true]);
    }

    public function onlyInline() {
        $this->standalone = false;
        $this->dropdown = true;
        return $this->onlyShowIn('inline');
    }

    public function label($label)
    {
        $this->label = $label;
        return $this;
    }

    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    public function getLabel()
    {
        return $this->label ?? $this->getName();
    }

    public function getName()
    {
        return $this->name ?? Str::headline(class_basename(static::class));
    }

    public function action($callback)
    {
        $this->callback = $callback;
        return $this;
    }

    public function handle($request, $models)
    {
        if (is_callable($this->callback)) {
            $response = $this->evaluate($this->callback, ['request' => $request, 'records' => $models, 'action' => $this]);
            if (isset($response)) {
                return $response;
            }
        }
        return $this->success();
    }

    public function success()
    {
        return [
            'message' => $this->successMessage,
        ];
    }

    public function getSlug() {
        return Str::kebab($this->getName());
    }

    public function getHandle() {
        return $this->handle ?? Str::kebab($this->getName());
    }

    public function getActionUrl($actionSlug) {
        if (isset($this->parent)) {
            return $this->parent->getActionUrl($actionSlug);
        }
    }

    public function getBulkActionUrl($resourceSlug) {
        return '/api/antfusion/resource/'.$resourceSlug.'/action/'.$this->getSlug();
    }

    public function confirmButtonText($confirmButtonText) {
        return $this->withMeta(['confirmButtonText' => $confirmButtonText]);
    }

    public function cancelButtonText($cancelButtonText) {
        return $this->withMeta(['cancelButtonText' => $cancelButtonText]);
    }

    public function confirmText($confirmText) {
        return $this->withMeta(['confirmText' => $confirmText]);
    }

    public function confirmTitle($confirmTitle) {
        return $this->withMeta(['confirmTitle' => $confirmTitle]);
    }

    public function primary($primary = true) {
        return $this->withMeta(['variant' => 'primary']);
    }

    public function fillForm($fillForm)
    {
        $this->fillForm = $fillForm;
        return $this;
    }

    public function getFillForm()
    {
        $data = $this->evaluate($this->fillForm, ['records' => $this->getRecords()]);
        foreach ($this->fields() as $field) {
            if (isset($data[$field->getHandle()])) {
                $data[$field->getHandle()] = $field->getState($data, $field->getHandle());
            }
        }
        return $data;
    }

    public function toArray() {
        $actionSlug = $this->getSlug();

        return array_merge($this->getMeta(), [
            'id' => unique_id(),
            'component' => $this->getComponent(),
            'text' => __($this->getLabel()),
            'title' => __($this->getLabel()),
            'url' => $this->getActionUrl($actionSlug),
            'to' => $this->getActionUrl($actionSlug), // currently needed or else resource index page will not shown properly
            'fields' => $this->fieldsArray(),
            'cssClass' => $this->getCssClass(),
            'asDropdown' => $this->dropdown,
            'dropdown' => $this->dropdown,
            'path' => $this->getPath(),
            'fill_form' => $this->getFillForm(),
            'footer_actions' => $this->getFooterActions()->filter(function($action, $index) {
                $action->setParent($this, $index, 'a');
                return !$action->isHidden() && !$action->isDropDown();
            })->map(function($action) {
                $action = $action->toArray();
                unset($action['to']);
                return $action;
            }),
        ]);
    }

    protected function getFooterActions()
    {
        $actions = $this->evaluate($this->footerActions);
        return isset($actions) ? collect($actions) : collect();
    }

    public function footerActions($actions)
    {
        $this->footerActions = $actions;
        return $this;
    }

    public function toArrayForDetail($record) {
        $array = $this->toArray();
        
        if ($this->hasFields()) {
            foreach ($this->fields() as $field) {
                $array['record'][$field->getHandle()] = $field->getState($record, $field->getHandle());
            }
            // $array['asDropdown'] = true;
            // $array['component'] = 'action-button';
        } else {
            // $array['component'] = 'action-dropdown-link';
        }
        unset($array['to']); // currently needed or else resource actions will not working properly
        return $array;
    }

    protected function getCssClass() {
        if ($this->destructive) {
            return ['danger'];
        } else if ($this->primary) {
            return ['primary'];
        }
    }

    protected function getComponent() {
        if (isset($this->component)) {
            return $this->component;
        } else if ($this->hasFields()) {
            return 'action-button';
        } else if ($this->isDropdown()) {
            return 'action-dropdown-link';
        } else {
            return 'ui-button';
        }
    }

    protected function hasFields() {
        $fields = $this->fields();
        return is_array($fields) && count($fields);
    }

    public function standalone($value = true) {
        $this->standalone = $value;
        return $this;
    }

    public function isStandalone() {
        return $this->standalone;
    }

    public function registerFor($parent) {
        $this->setParent($parent);
        $parent->registerAction($this);
        return $this;
    }

    public function isDropdown() {
        return $this->dropdown;
    }

    public function dropdown($dropdown = true)
    {
        return $this->asDropdown($dropdown);
    }

    public function asDropdown($dropdown = true) {
        // $this->component = 'ui-dropdown-link';
        $this->withMeta(['asDropdown' => true]);
        $this->dropdown = $dropdown;
        return $this;
    }

    public function isShowForRecord($record) {
        if (is_callable($this->visible)) {
            return $this->evaluate($this->visible, ['record' => $record, 'filter' => request()->filter, 'scenario' => $this->scenario]);
        }
        return true;
    }

    public function whenRecord($callback) {
        $this->visible = $this->whenRecord = $callback;
        return $this;
    }

    public function whenFilterActived($filter, $value) {
        $filterHandle = app($filter)->getHandle();
        $value = is_array($value) ? $value : [$value];
        if (in_array(request()->filter[$filterHandle] ?? null, $value)) {
            $this->show();
        } else {
            $this->hide();
        }
        return $this;
    }

    public function loadAllRecordField($boolean = true)
    {
        return $this->withMeta(['load_all' => $boolean]);
    }
}