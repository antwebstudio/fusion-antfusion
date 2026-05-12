<?php
namespace Addons\AntFusion;

class ResourceForExporter extends Resource
{
    protected $params = [];

    protected $resourceClass;
    
    public function __construct($resource) {
        $this->resourceClass = get_class($resource);

        // Serialize the query builder so closures inside scopes
        // don't break queue serialization.
        $this->params['exportToExcelQuery'] = \Laravie\SerializesQuery\Eloquent::serialize(
            $resource->exportToExcelQuery()
        );

        // Pre-compute headings (plain array, always serializable)
        $this->params['exportToExcelHeadings'] = $resource->exportToExcelHeadings();
    }

    public function exportToExcelQuery()
    {
        return \Laravie\SerializesQuery\Eloquent::unserialize(
            $this->params['exportToExcelQuery']
        );
    }

    /**
     * Delegate exportToExcelMap to a fresh, minimal instance of the
     * original resource class so per-row mapping logic still works.
     */
    public function exportToExcelMap($model)
    {
        // Resolve a fresh instance each call; the container-bound
        // singleton is fine because we only need the map method.
        return (new $this->resourceClass)->exportToExcelMap($model);
    }

    public function __call($name, $arguments)
    {
        return $this->params[$name];
    }

    // Prevent the parent Resource class from pulling in closure-heavy
    // actions and fields during serialization.
    public function actions()
    {
        return [];
    }

    public function fields()
    {
        return [];
    }

    public function filters()
    {
        return [];
    }

    public function register()
    {
        // no-op: exporter does not need to register routes/menus
    }
}