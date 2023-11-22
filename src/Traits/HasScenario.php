<?php
namespace Addons\AntFusion\Traits;

trait HasScenario
{
    protected $scenario;
    protected $scenarioCallbacks = [];

    public function whenScenario($scenario, $callback)
    {
        if (is_array($scenario)) {
            foreach ($scenario as $singleScenario) {
                $this->when($singleScenario, $callback);
            }
        }
        $this->scenarioCallbacks[$scenario][] = $callback;

        return $this;
    }

    public function setScenario($scenario, $processCallback = true)
    {
        $this->scenario = $scenario;

        if ($processCallback) {
            $this->processScenarioCallback();
        }

        return $this;
    }

    public function processScenarioCallback()
    {
        if (isset($this->scenarioCallbacks[$this->scenario])) {
            foreach ($this->scenarioCallbacks[$this->scenario] as $callback) {
                call_user_func_array($callback, [$this]);
            }
        }
    }
}