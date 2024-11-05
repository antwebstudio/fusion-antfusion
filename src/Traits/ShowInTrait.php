<?php
namespace Addons\AntFusion\Traits;

trait ShowInTrait {
    use \Addons\AntFusion\Traits\HasScenario;
    
    protected $showIn = [];
    protected $exceptShowIn = [];
    protected $formViews = ['creating', 'updating'];
    protected $showByDefault = true;
    protected $scenario;
    protected $hide = false;

    public function exceptShowIn($scenario) {
        $this->showByDefault = true;
        $this->exceptShowIn[$scenario] = true;
        return $this;
    }

    public function onlyShowIn($scenario) {
        $this->showByDefault = false;
        $this->showIn[$scenario] = true;
        return $this;
    }

    public function shouldShowIn($scenario) {
        if (isset($this->exceptShowIn[$scenario]) && $this->exceptShowIn[$scenario]) {
            return false;
        } else if (isset($this->showIn[$scenario]) && $this->showIn[$scenario]) {
            return true;
        }
        return $this->showByDefault;
    }

    // public function setScenario($scenario) {
    //     $this->scenario = $scenario;
    //     return $this;
    // }

    public function isHidden() {
        return $this->hide;
    }

    public function show($show = true) {
        return $this->hide(!$show);
    }

    public function hide($hide = true) {
        $this->hide = $hide;
        $this->withMeta(['hide' => $hide]);
        return $this;
    }

    public function canSee($callable) {
        if (!call_user_func_array($callable, [request()])) {
            $this->hide();
        }
        return $this;
    }
}