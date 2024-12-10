<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

abstract class Action {
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\HasHooks;
    use \Addons\AntFusion\Traits\EvaluatesClosures;

    protected $confirmButtonText;

    protected $name;

    protected $standalone = false;

    protected $destructive = false;

    protected $primary = false;

    protected $hide = false;

    protected $dropdown = false;

    protected $component;

    protected $whenRecord;

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    public function performAction($request) {
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
        return $this->handle($request, collect($models ?? []));
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

    public function onlyInline() {
        $this->standalone = false;
        $this->dropdown = true;
        return $this->onlyShowIn('inline');
    }

    public function label($label)
    {
        return $this->setName($label);
    }

    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    public function getName() {
        return $this->name ?? Str::headline(class_basename(static::class));
    }

    public function handle($request, $models) {

    }

    public function getSlug() {
        return Str::kebab($this->getName());
    }

    public function getHandle() {
        return Str::kebab($this->getName());
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

    public function toArray() {
        $actionSlug = $this->getSlug();

        return array_merge($this->meta, [
            'id' => unique_id(),
            'component' => $this->getComponent(),
            'text' => __($this->getName()),
            'title' => __($this->getName()),
            'url' => $this->getActionUrl($actionSlug),
            'to' => $this->getActionUrl($actionSlug), // currently needed or else resource index page will not shown properly
            'fields' => $this->fieldsArray(),
            'cssClass' => $this->getCssClass(),
            'asDropdown' => $this->dropdown,
            'dropdown' => $this->dropdown,
            'path' => $this->getPath(),
        ]);
    }

    public function toArrayForDetail($record) {
        $array = $this->toArray();
        
        if ($this->hasFields()) {
            foreach ($this->fields() as $field) {
                $record = $field->processDataTableRecord($record);
                $array['record'] = $record;
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

    public function asDropdown($dropdown = true) {
        // $this->component = 'ui-dropdown-link';
        $this->withMeta(['asDropdown' => true]);
        $this->dropdown = $dropdown;
        return $this;
    }

    public function isShowForRecord($record) {
        if (isset($this->whenRecord)) {
            return call_user_func_array($this->whenRecord, [$record]);
        }
        return true;
    }

    public function whenRecord($callback) {
        $this->whenRecord = $callback;
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
}