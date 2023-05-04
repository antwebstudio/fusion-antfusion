<?php
namespace Addons\AntFusion\Traits;

use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;
use Addons\AntFusion\Contracts\Panel;

trait HasDataTable {
    public function dataTableQuery() {
        return $this->query();
    }

    public function getDataTableComponent() {
        return new \Addons\AntFusion\Components\DataTable($this->getDataTableEndpoint());
    }

    public function getDisplayableColumns() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (!is_string($field)) {
                if ($field->shouldShowIn('index') && !$field->isHidden()) {
                    $columns[] = $field->handle;
                }
            } else {
                $columns[] = $field;
            }
        }
        return $columns;
    }

    protected function getFieldsForDataTable() {
        return $this->resolveFields();
    }

    public function getFilterable() {
        return $this->getDisplayableColumns();
    }

    public function getSortable() {
        $columns = ['id'];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (!is_string($field)) {
                if ($field->isSortable()) {
                    $columns[] = $field->handle;
                }
            } else {
                $columns[] = $field;
            }
        }
        return $columns;
    }

    public function getCustomColumnTypes() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (!is_string($field)) {
                $component = $field->getIndexComponent();
                if (isset($component)) {
                    $columns[$field->handle] = $component;
                } else if ($this->clickColumnHandle == $field->handle) {
                    $columns[$field->handle] = $this->clickColumnComponent;
                }
            } else {
                if ($this->clickColumnHandle == $field) {
                    $columns[$field] = $this->clickColumnComponent;
                }
            }
        }
        return $columns;
    }

    public function getCustomColumnNames() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (!is_string($field)) {
                $columns[$field->handle] = $field->label;
            }
        }
        return $columns;
    }

    public function getAllowedFilters()
    {
        $filters = [];

        foreach ($this->filters() as $filter) {
            $filters[] = $filter->getAllowedFilter();
        }

        $filters[] = AllowedFilter::callback('search', function (Builder $query, $value) {
            return $query->where(function (Builder $query) use ($value) {
                foreach ($this->getFilterable() as $field) {
                    $query->orWhere($field, 'LIKE', "%$value%");
                }
            });
        });

        return $filters;
    }

    public function getBulkActions() {
        $actions = [];
        foreach ($this->actions() as $action) {
            if (!$action->isStandalone() && !$action->isHidden() && $action->shouldShowIn('index') && $action->shouldShowIn('bulk')) {
                $actions[] = [
                    'route' => $action->getBulkActionUrl($this->getSlug()),
                    'name' => $action->getName(),
                    'params' => $action->toArray(),
                ];
            }
        }
        return $actions;
    }

    public function getExemptFromBulkActions() {
        return [];
    }

    public function getDataTableRecords($records) {
        return $records;
    }
}