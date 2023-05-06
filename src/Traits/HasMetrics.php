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
        foreach ($this->metrics() as $metric) {
            $metric->setParent($this);
            $metrics[$metric->getHandle()] = $metric->calculate(request());
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