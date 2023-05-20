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
            throw new \Exception('Action ' . $actionName . ' is not registered (for '.get_class($this).')');
        }
    }

    public function actions() {
        return [];
    }

    protected function initActions() {
        if (!isset($this->initializedActions)) {
            $this->initializedActions = [];
            foreach ((array) $this->actions() as $index => $action) {
                $this->initializedActions[$action->getHandle()] = $action;
                $action->setParent($this, $index, 'a');
            }
        }
    }

    public function getDropDownActionsForRecord($record) {
        return $this->getActionsByFilterForRecord($record, function($action) use($record) {
            return !$action->isStandalone() && !$action->isHidden() && $action->isDropDown() && $action->isShowForRecord($record);
        });
    }

    public function getNonDropDownActionsForRecord($record) {
        return $this->getActionsByFilterForRecord($record, function($action) use($record) {
            return !$action->isStandalone() && !$action->isHidden() && !$action->isDropDown() && $action->isShowForRecord($record);
        });
    }

    protected function getActionsByFilterForRecord($record, $filterCallback) {
        $this->initActions();

        $actionsArray = [];
        foreach ($this->initializedActions as $action) {
            if (call_user_func_array($filterCallback, [$action, $record])) {
                $actionsArray[] = $action->toArrayForDetail($record);
            }
        }
        return $actionsArray;
    }

    protected function actionsArrayForDetail($record) {
        $this->initActions();

        $actionsArray = [];
        foreach ($this->initializedActions as $action) {
            if (!$action->isStandalone() && !$action->isHidden()) {
                $actionsArray[] = $action->toArrayForDetail($record);
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