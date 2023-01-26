<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;

class Action {
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\ShowInTrait;

    protected $confirmButtonText;

    protected $name;

    protected $standalone = false;

    protected $destructive = false;

    protected $primary = false;

    protected $hide = false;

    protected $component;

    public function performAction($request) {
        $request->validate($this->rules());

        if ($request->has('resourceIds')) {
            $models = $this->parent->findByIds($request->resourceIds);
        } else if ($request->has('records')) {
            // For datadatable bulk actions
            $models = $this->parent->findByIds($request->records);
        }
        return $this->handle($request, collect($models ?? []));
    }

    public function exceptOnIndex() {
        return $this->exceptShowIn('index');
    }

    public function onlyInline() {
        return $this->onlyShowIn('inline');
    }

    public function getName() {
        return $this->name;
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
        $this->primary = $primary;
        return $this;
    }

    public function toArray() {
        $actionSlug = $this->getHandle();

        return array_merge($this->meta, [
            'component' => $this->getComponent(),
            'text' => $this->name,
            'title' => $this->name,
            'url' => $this->getActionUrl($actionSlug),
            'to' => $this->getActionUrl($actionSlug), // currently needed or else resource index page will not shown properly
            'fields' => $this->fieldsArray(),
            'cssClass' => $this->getCssClass(),
            'variant' => $this->primary ? 'primary' : null,
        ]);
    }

    public function toArrayForDetail() {
        $array = $this->toArray();
        $array['component'] = 'action-dropdown-link';
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
        if ($this->hasFields()) {
            return 'action-button';
        } else if (isset($this->component)) {
            return $this->component;
        } else {
            return 'ui-button';
        }
    }

    protected function hasFields() {
        $fields = $this->fields();
        return is_array($fields) && count($fields);
    }

    public function isStandalone() {
        return $this->standalone;
    }

    public function registerFor($parent) {
        $this->setParent($parent);
        $parent->registerAction($this);
        return $this;
    }
}