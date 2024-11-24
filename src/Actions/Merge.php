<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;
use Addons\AntFusion\Fields\Fusion;
use Addons\AntFusion\Fields\Select;

class Merge extends Action
{
    // protected $name = 'Delist';

    protected $destructive = true;

    protected $successMessage = 'Merged successfully';

    protected $dropdown = true;

    protected $model;

    public function __construct()
    {
        // $this->confirmText('Are you sure you want to merge these?');
        // $this->confirmTitle('Merge record?');
        // $this->confirmButtonText('Merge');
        $this->onlyBulkAction();
        $this->withMeta(['ajax_modal' => true]);
    }

    public function model($model = null)
    {
        if (isset($model)) {
            $this->model = $model;
            return $this;
        }
        return $this->model;
    }

    public function recordFields()
    {
        $records = collect();
        if (request()->records) {
            $records = $this->model()->find(request()->records);
            ray($records);
        }
        return [
            Select::make('Main records', 'main_record')->options($records->map(function($record) {
                return [
                    'label' => '['.$record->getKey().'] '.$record->name,
                    'value' => $record->getKey(),
                ];
            }))
        ];
    }

    public function fields() {
        return [
            Fusion::make('Main Record', 'main_record')->setComponent('merge'),
        ];
    }

    public function handle($request, $entries) {
        if ($request->from == 'ajax-modal') {
            $records = [];
            foreach ($entries as $model) {
                foreach ($this->recordFields() as $field) {
                    $model = $field->processDataTableRecord($model);
                }
                $records[] = $model;
            }
            return [
                'fields' => $this->convertFieldsToArray($this->recordFields()),
                'records' => $records,
            ];
        }
        $mainRecordId = $request->main_record['main_record'];
        $mainRecord = $this->model()->findOrFail($mainRecordId);
        $mergeRecords = $entries->reject(function($entry) use($mainRecord) {
            return $entry->id == $mainRecord->id;
        });
        // ray($mainRecord->id, $mergeRecords);
        
        activity()->withoutLogs(function () use($mainRecord, $mergeRecords) {
            $mainRecord->mergeRecords($mergeRecords);
        });
        return [
            'message' => $this->successMessage,
        ];
    }
}