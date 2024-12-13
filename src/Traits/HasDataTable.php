<?php
namespace Addons\AntFusion\Traits;

use Addons\AntFusion\Contracts\Panel;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;

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
            if (is_object($field)) {
                if ($field->shouldShowIn('index') && !$field->isHidden()) {
                    $columns[] = $field->getHandle();
                }
            } else if (is_array($field)) {
                $columns[] = key($field);
            } else {
                $columns[] = $field;
            }
        }
        return $columns;
    }

    protected function getFieldsForDataTable() {
        return $this->resolveFields(true);
    }

    public function getFilterable() {
        return $this->getDisplayableColumns();
    }

    public function getAllowedSorts()
    {
        $columns = ['id' => 'id'];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (is_object($field)) {
                if ($field->isSortable()) {
                    $columns[$field->getHandle()] = $field->getSortableColumn();
                }
            } else if (is_array($field)) {
                $handle = key($field);
                $columns[$handle] = $handle;
            } else {
                $handle = $field;
                $columns[$handle] = $handle;
            }
        }
        return $columns;
    }

    public function getSortable() {
        return array_keys($this->getAllowedSorts());
    }

    public function getCustomColumnTypes() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (is_object($field) && $this->clickColumnHandle == $field->handle) {
                $columns[$field->handle] = $this->clickColumnComponent;
            } else if ($this->clickColumnHandle == $field) {
                $columns[$field] = $this->clickColumnComponent;
            } else if (is_object($field)) {
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

    public function getCustomColumnProps() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (is_object($field)) {
                $columns[$field->handle] = $field->getComponentProps();
            }
        }
        return $columns;
    }

    public function getCustomColumnNames() {
        $columns = [];
        foreach ($this->getFieldsForDataTable() as $field) {
            if (is_object($field)) {
                $columns[$field->handle] = $field->label;
            } else if (is_array($field)) {
                $columns[key($field)] = current($field);
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
            if (method_exists($this, 'search')) {
                return $this->search($query, $value);
            } else {
                return $query->where(function (Builder $query) use ($value) {                
                    $values = is_array($value) ? $value : [$value];
                    foreach ($this->getFilterable() as $field) {
                        foreach ($values as $v) {
                            $query->orWhere($field, 'LIKE', "%$v%");
                        }
                    }
                });
            }
        });

        return $filters;
    }

    public function getBulkActions() {
        $actions = [];
        foreach ($this->actions() as $action) {
            if (!$action->isStandalone() && !$action->isHidden() && $action->shouldShowIn('index') && $action->shouldShowIn('bulk')) {
                $action->setParent($this);
                $actions[] = [
                    'route' => $action->getBulkActionUrl($this->getSlug()),
                    'name' => $action->getLabel(),
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

    public function getQueryBuilder()
    {
        return QueryBuilder::for($this->dataTableQuery())

            // Allowed selectable fields   (e.g. fields['name']=John)
            ->allowedFields($this->getDisplayableColumns())

            // Allowed filterable columns  (e.g. filter['search']=foo)
            ->allowedFilters($this->getAllowedFilters())

            // Allowed relationship includes (e.g. include=posts)
            // ->allowedIncludes($this->getRelationships())

            // Allowed sortable columns    (e.g. sort=name)
            ->allowedSorts($this->getAllowedSorts())

            // Default sortable column
            // ->defaultSort($this->getDefaultSort())

            ->withoutGlobalScopes();

            // Pagination
            // - perPage (defaults to `PER_PAGE`)
            // - page    (defaults to `PAGE_NUM`)
            // ->paginate(
            //     $request->query('perPage', self::PER_PAGE),
            //     ['*'], // fix issue where displayable columns cannot be configured properly when there is column which is not exist in the table (eg, column generated using aggregate function)
            //     get_class($this),
            //     $request->query('page', self::PAGE_NUM)
            // );
    }

    public function processDataTableRecord($record) {
        foreach ($this->getFieldsForDataTable() as $field) {
            if (is_object($field)) {
                $record = $field->processDataTableRecord($record);
            }
        }
        return $record;
    }
}