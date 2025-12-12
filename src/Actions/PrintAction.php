<?php
namespace Addons\AntFusion\Actions;

class PrintAction extends Link {
    public function __construct($name)
    {
        $this->name = $name;
    }

    public function baseOnResourceAndFilters($resource)
    {
        $this->redirect = function() use($resource) {
            $request = request();
            $dataTable = collect($request->form['components'])->firstWhere(function($component) {
                return $component['handle'] == 'datatable';
            });
            $sort = null;
            if (isset($dataTable['sorting']['order']) && isset($dataTable['sorting']['key'])) {
                $sort = ($dataTable['sorting']['order'] == 'desc' ? '-' : '').$dataTable['sorting']['key'];
            }
            $params = ['resource' => $resource->getSlug(), 'sort' => $sort, 'filters' => $dataTable['default_filter_values']];
            return route('resource.print', $params);
        };
        return $this;
    }
}