<?php
namespace Addons\AntFusion\Traits;

trait HasActions {
    protected $initializedActions;

    public function registerAction($action) {
        $this->initializedActions[$action->getHandle()] = $action;
    }

    public function performAction($actionName, $request) {
        $this->initActions();
        if (isset($this->initializedActions[$actionName])) {
            return $this->initializedActions[$actionName]->performAction($request);
        } else {
            throw new \Exception('Action ' . $actionName . ' is not registered');
        }
    }

    public function actions() {
        return [];
    }

    protected function initActions() {
        if (!isset($this->initializedActions)) {
            $this->initializedActions = [];
            foreach ($this->actions() as $action) {
                $this->initializedActions[$action->getHandle()] = $action;
                $action->setParent($this);
            }
        }
    }

    protected function actionsArrayForDetail() {
        $this->initActions();

        $actionsArray = [];
        foreach ($this->initializedActions as $action) {
            if (!$action->isStandalone() && !$action->isHidden()) {
                $actionsArray[] = $action->toArrayForDetail();
            }
        }
        return $actionsArray;
    }

    protected function actionsArray() {
        $this->initActions();

        $actionsArray = [];
        foreach ($this->initializedActions as $action) {
            if ($action->isStandalone() && !$action->isHidden()) {
                $actionsArray[] = $action->toArray();
            }
        }
        return $actionsArray;
    }
}