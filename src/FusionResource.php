<?php
namespace Addons\AntFusion;

use Ant\FusionHelper\Helpers\Fusion;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

abstract class FusionResource extends Resource {
    protected $matrix;

    protected $excludeSections = ['system', 'meta'];

    public function actions() {
        return [
            (new \Addons\AntFusion\Actions\Create)->primary(),
            new \Addons\AntFusion\Actions\Edit,
            new \Addons\AntFusion\Components\Divider,
            new \Addons\AntFusion\Actions\Delete,
        ];
    }

    protected function afterCreate($request, $model)
    {
        $data = $this->getFormData($request, 'creating');
        $this->persistRelationships($model, $data);
    }

    protected function afterUpdate($request, $model)
    {
        $data = $this->getFormData($request, 'updating');
        $this->persistRelationships($model, $data);
    }

    protected function persistRelationships($model, $data) {
        foreach ($this->getMatrix()->blueprint->relationships() as $field) {
            if (isset($data[$field->handle])) {
                $field->type()->persistRelationship($model, $field, $data[$field->handle]);
            }
        }
    }

    protected function getEditRecord($model) {
        $data = $model->toArray();
        
        if ($model->fields) {
            foreach ($model->fields as $field) {
                $data[$field->handle] = $field->type()->getResource($model, $field);
            }
        }
        return $data;
    }

    protected function getMatrix()
    {
        if (!isset($this->matrix)) {
            foreach (\Fusion\Models\Matrix::get() as $matrix) {
                if ($this->model == $matrix->getBuilderModelNamespace() || is_subclass_of($this->model, $matrix->getBuilderModelNamespace())) {
                    $this->matrix = $matrix;
                    return $this->matrix;
                }
            }
        }
        return $this->matrix;
    }

    protected function fieldsDefaultValues() {
        $matrix = $this->getMatrix();
        if (isset($matrix)) {
            $handle = $matrix->handle;
        }
        $handle = $handle ?? $this->getHandle();
        return [
            'slug' => request()->name ? Str::slug(request()->name) : null, // TODO: to use Core module Str::utf8slug() instead
            'taxonomy_id' => Fusion::getTaxonomyId($handle),
            'matrix_id' => Fusion::getMatrixId($handle),
        ];
    }
    
    public function fields() {
        return [
            // 'id',
            $this->getNameField(),
            'slug',
            $this->getTabFromSections($this->excludeSections),
            \Addons\AntFusion\Fields\Fusion::make('Created Time', 'created_at')->type('datetime')->exceptOnForms(),
            \Addons\AntFusion\Fields\Fusion::make('Updated Time', 'updated_at')->type('datetime')->exceptOnForms(),
        ];
    }

    protected function getNameField()
    {
        return \Addons\AntFusion\Components\Panel::make(null, [
            \Addons\AntFusion\Fields\Fusion::make('Name', 'name')->setComponent('ui-title-group')->rules(['required']),
        ]);
    }

    protected function getTabFromSections($excludeSections = [])
    {
        return \Addons\AntFusion\Components\Tabs::make()->addDynamicTabs(function($tab) use($excludeSections) {
            $matrix = $this->getMatrix();
            foreach ($matrix->blueprint->sections as $section) {
                if (!in_array($section->handle, $excludeSections)) {
                    $fields = [];
                    foreach ($section->fields as $field) {
                        $fields[] = \Addons\AntFusion\Fields\Fusion::makeFromField($field)->hideFromIndex();
                    }
                    $tab->addTab($section->name, [
                        \Addons\AntFusion\Components\Panel::make(null, $fields)
                    ]);
                }
            }
        });
    }

    public function model() {
        if (isset($this->model)) {
            return app($this->model);
        } else {
            if (class_exists('App\\Models\\'.class_basename(static::class))) {
                return app('App\\Models\\'.class_basename(static::class));
            } else if (class_exists('Fusion\\Models\\Collections\\'.class_basename(static::class))) {
                return app('Fusion\\Models\\Collections\\'.class_basename(static::class));
            } else if (class_exists('Fusion\\Models\\Singles\\'.class_basename(static::class))) {
                return app('Fusion\\Models\\Singles\\'.class_basename(static::class));
            } else if (class_exists('Fusion\\Models\\Taxonomies\\'.class_basename(static::class))) {
                return app('Fusion\\Models\\Taxonomies\\'.class_basename(static::class));
            }
            throw new \Exception('Not able to guest the model class name');
        }
    }
}