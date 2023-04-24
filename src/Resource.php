<?php
namespace Addons\AntFusion;

use Fusion\Facades\Menu;
use App\Models\Instructor;
use Illuminate\Support\Str;
use Addons\AntFusion\Http\Resources\ResourceResource;

abstract class Resource {
    use \Addons\AntFusion\Traits\CanCreate;
    use \Addons\AntFusion\Traits\CanEdit;
    use \Addons\AntFusion\Traits\HasDataTable;
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasActions;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\HasFilters;
    
    protected $name;
    protected $model;
    protected $slug;
    protected $handle;
    protected $icon = 'grip-horizontal';
    protected $clickColumnHandle = 'name';
    protected $clickColumnComponent = 'antfusion-edit-link';

    public function register() {
        $handle = $this->getHandle();
        $slug = $this->getSlug();
        $name = $this->getName();
        $icon = $this->getIcon();
        
        app()->bind('resources.'.$slug, function() {
            return $this;
        });

        Menu::set('admin.resource-'.$slug, [
            'title' => $name,
            'to'    => '/resource/'.$slug,
            'icon'  => $icon,
        ]);
    }

    public function getName() {
        return $this->name ?? Str::headline(class_basename(static::class));
    }

    public function getHandle() {
        return $this->handle ?? Str::snake(class_basename(static::class));
    }

    public function getSlug() {
        return $this->slug ?? Str::kebab(class_basename(static::class));
    }

    public function getIcon() {
        return $this->icon;
    }

    public function findByIds($resourceIds) {
        return $this->model()->withoutGlobalScopes()->whereIn('id', $resourceIds)->get();
    }

    public function find($resourceId) {
        return $this->model()->find($resourceId);
    }

    public function findOrFail($resourceId) {
        return $this->model()->findOrFail($resourceId);
    }

    public function query() {
        return $this->model()->query();
    }

    public function model() {
        if (isset($this->model)) {
            return app($this->model);
        } else {
            return app('App\\Models\\'.class_basename(static::class));
        }
    }

    public function getActionsForIndex() {
        return $this->actionsArray();
    }

    public function getDropDownActionsForRecord($record) {
        return $this->actionsArrayForDetail($record);
    }

    public function getActionsForRecord($record) {
        if ($this->hasAction()) {
            return [
                [
                    'component' => 'nested-component',
                    'as' => 'ui-actions',
                    'props' => [
                        
                    ],
                    'children' => $this->getDropDownActionsForRecord($record),
                ],
            ];
        } else {
            return [];
        }
    }

    protected function hasAction() {
        return count($this->actions());
    }

    public function getActionUrl($actionSlug) {
        return '/api/antfusion/resource/'.$this->getSlug().'/action/'.$actionSlug;
    }

    protected function fieldsDefaultValues() {
        return [];
    }

    public function toIndexArray() {
        return $this->toArray();
    }

    protected function getDataTableEndpoint() {
        return '/datatable/antfusion/resource/'.$this->getSlug();
    }

    public function toArray() {
        $components = [
            [
                'is' => 'resource-datatable',
                'show_order' => false,
                'id' => 'data-table-'.$this->getSlug(),
                'endpoint' => $this->getDataTableEndpoint(),
                'filters' => $this->filtersArray(),
                'actions' => [
                    [
                        // 'component' => 'ui-actions',
                        'component' => 'ui-button',
                        'text' => 'Edit',
                    ],
                ],
            ],
        ];

        return [
            'title' => $this->getName(),
            'resource' => new ResourceResource($this),
            'components' => $components,
            'actions' => $this->getActionsForIndex(),
        ];
    }

    public function getPath() {
        return 'resources:'.$this->getSlug();
    }
}