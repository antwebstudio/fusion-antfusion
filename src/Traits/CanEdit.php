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
        $name = static::getName();
        return [
            'title' => 'Edit '.$name,
            'resource' => new ResourceResource($this),
            'record' => $this->getEditRecord($model),
            'actions' => [
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
            ],
            'fields' => $this->flatternFieldsArray('updating'),
            'children' => $this->fieldsArray('updating'),
        ];
    }

    protected function getEditRecord($model) {
        return $model;
    }
}