<?php
namespace Addons\AntFusion\Traits;

trait HasMetrics
{
    public function metrics()
    {
        return [];
    }

    // DataTable
    public function getMetrics()
    {
        $metrics = [];
        foreach ($this->metrics() as $index => $metric) {
            $metric->setParent($this, $index, 'm');
            $metrics[$metric->getHandle()] = $metric->calculateAndFormat(request());
        }

        return $metrics;
    }

    public function metricsArray()
    {
        $metrics = [];
        foreach ($this->metrics() as $metric) {
            $metrics[] = $metric->toArray();
        }

        return $metrics;
    }
}