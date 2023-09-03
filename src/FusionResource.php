<?php
namespace Addons\AntFusion;

use Ant\FusionHelper\Helpers\Fusion;

abstract class FusionResource extends Resource {
    public function actions() {
        return [
            (new \Addons\AntFusion\Actions\Create)->primary(),
            new \Addons\AntFusion\Actions\Edit,
            new \Addons\AntFusion\Components\Divider,
            new \Addons\AntFusion\Actions\Delete,
        ];
    }

    protected function fieldsDefaultValues() {
        return [
            'matrix_id' => Fusion::getMatrixId($this->getHandle()),
        ];
    }
    
    public function fields() {
        return [
            // 'id',
            \Addons\AntFusion\Components\Panel::make(null, [
                \Addons\AntFusion\Fields\Fusion::make('Name', 'name')->setComponent('ui-title-group')->rules(['required']),
            ]),
            'slug',
            \Addons\AntFusion\Fields\Fusion::make('Created Time', 'created_at')->type('datetime')->exceptOnForms(),
            \Addons\AntFusion\Fields\Fusion::make('Updated Time', 'updated_at')->type('datetime')->exceptOnForms(),
        ];
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