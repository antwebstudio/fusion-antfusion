<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Http\Request;
use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanCreate {
    public function create(Request $request) {
        $this->prepareForValidation($request);
        $validated = $request->validate($this->getRules('creating'));
        $model = $this->model()->create(array_merge($this->fieldsDefaultValues(), $validated));
        return $this->afterCreate($request, $model);
    }

    protected function afterCreate($request, $model)
    {
        return $this->afterSave($request, $model);
    }

    public function createMeta() {
        $name = static::getName();
        return [
            'title' => __('Create :name', ['name' => $name]),
            'resource' => new ResourceResource($this),
            'actions' => [
                [
                    'component' => 'ui-button',
                    'to' => '/resource/'.$this->getSlug(),
                    'text' => __('Back'),
                    'class' => 'mr-2',
                ],
                [
                    'component' => 'submit-button',
                    'text' => __('Save'),
                    'variant' => 'primary',
                    'useParentSubmit' => true,
                ],
            ],
            'fields' => $this->flatternFieldsArray('creating'),
            'children' => $this->fieldsArray('creating'),
        ];
    }
}