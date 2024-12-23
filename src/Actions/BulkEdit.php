<?php

namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;
use Addons\AntFusion\Fields\Fusion;
use Illuminate\Support\Arr;

class BulkEdit extends Action
{
    protected $dropdown = true;

    protected $bulkEditForm = [];

    protected $eachAction;

    public function __construct()
    {
        $this->confirmButtonText('Save')->onlyBulkAction();
    }

    public function getActionUrl($actionSlug)
    {
        if (isset($this->parent)) {
            return $this->parent->getActionUrl($actionSlug);
        }
    }

    public function handle($request, $models)
    {
        if ($request->from == 'ajax-modal') {
            $records = [];
            foreach ($models as $model) {
                foreach ($this->recordFields() as $field) {
                    $model = $field->processDataTableRecord($model);
                }
                $records[] = $model;
            }

            return [
                'fields' => $this->convertFieldsToArray($this->recordFields()),
                'records' => $records,
            ];
        } else {
            $fieldHandles = collect($this->recordFields())->map(function ($field) {
                return $field->getHandle();
            })->toArray();
            $records = collect($request->batch_edit)->keyBy('id');
            foreach ($models as $model) {
                $data = Arr::only($records[$model->id], $fieldHandles);

                $this->evaluate($this->eachAction, [
                    'record' => $model,
                    'data' => $data,
                ]);
                
            }
        }
    }

    public function eachAction($callback)
    {
        $this->eachAction = $callback;
        return $this;
    }

    public function bulkEditForm($form)
    {
        $this->bulkEditForm = $form;

        $loadRecord = collect($form)->mapWithKeys(function ($field) {
            return [$field->getHandle() => $field->getHandle()];
        })->toArray();

        return $this->withMeta(['load_record' => $loadRecord]);
    }

    public function recordFields()
    {
        return $this->bulkEditForm;
    }

    public function fields()
    {
        if (request()->from == 'ajax-modal') {
            return $this->recordFields();
        }
        return [
            Fusion::make('Batch Edit', 'batch_edit')->setComponent('bulk-edit'),
        ];
    }
}
