<?php
namespace Addons\AntFusion\Traits;

trait HasHooks {
    protected $hooks = [];

    public function registerHook($name, $callback)
    {
        $this->hooks[$name][] = $callback;
        return $this;
    }

    public function hook($name, $arguments)
    {
        if (isset($this->hooks[$name])) {
            foreach ($this->hooks[$name] as $hook) {
                call_user_func_array($hook, $arguments);
            }
        }
        return $this;
    }
}