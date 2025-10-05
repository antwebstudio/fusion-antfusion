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
                return $component['handle'];
            });
            $params = ['resource' => $resource->getSlug(), 'filters' => $dataTable['default_filter_values']];
            return route('resource.print', $params);
        };
        return $this;
    }
}