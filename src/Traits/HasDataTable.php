<?php
namespace Addons\AntFusion\Traits;

use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;
use Addons\AntFusion\Contracts\Panel;

trait HasDataTable {
    public function getDisplayableColumns() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (!is_string($field)) {
                $columns[] = $field->handle;
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
        return $this->getDisplayableColumns();
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
            if (!$action->isStandalone() && !$action->isHidden() && $action->shouldShowIn('index')) {
                $actions[] = [
                    'route' => $action->getBulkActionUrl($this->getSlug()),
                    'name' => $action->getName(),
                ];
            }
        }
        return $actions;
    }

    public function getExemptFromBulkActions() {
        return [];
    }
}