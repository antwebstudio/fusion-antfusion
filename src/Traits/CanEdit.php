<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Http\Request;
use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanEdit {
    public function update(Request $request) {
        $validated = $request->validate($this->rules());
        $model = $this->model()->find($request->resourceId);
        $model->update($validated);
    }

    public function editMeta($resourceId) {
        $model = $this->model()->find($resourceId);

        return [
            'title' => $this->getEditTitle($model),
            'subtitle' => $this->getEditSubtitle($model),
            'resource' => new ResourceResource($this),
            'record' => $this->getEditRecord($model),
            'actions' => $this->getEditPageActions($model),
            'fields' => $this->flatternFieldsArray('updating'),
            'children' => $this->fieldsArray('updating'),
        ];
    }

    protected function getEditPageActions($model) {
        return [
            [
                'component' => 'ui-button',
                'to' => '/resource/'.$this->getHandle(),
                'text' => 'Back',
                'class' => 'mr-2',
            ],
            [
                'component' => 'submit-button',
                'text' => 'Save',
                'variant' => 'primary',
            ],
        ];
    }

    protected function getEditTitle($model) {
        return 'Edit '.$this->getName();
    }

    protected function getEditRecord($model) {
        return $model;
    }

    protected function getEditSubtitle($model) {
        return $model->name;
    }
}