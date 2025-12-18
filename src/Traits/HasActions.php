<?php
namespace Addons\AntFusion\Traits;

trait HasActions {
    protected $initializedActions = [];
    protected $isActionInitialized = false;

    public function registerAction($action) {
        $action->setParent($this);
        $this->initializedActions[$action->getHandle()] = $action;
        return $action;
    }

    public function performAction($request, $actionName) {
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

    protected function initActions($records = null) {
        if (!$this->isActionInitialized) {
            foreach ($this->initializedActions as $action) {
                $action->setRecords($records);
            }
            foreach ((array) $this->actions() as $index => $action) {
                $this->initializedActions[$action->getHandle()] = $action;
                $action->setRecords($records)->setParent($this, $index, 'a');
            }
        }
        return collect($this->initializedActions);
    }

    public function getDropDownActionsForRecord($record) {
        return $this->getActionsByFilterForRecord($record, function($action) use($record) {
            return $action->shouldShowIn('inline') && !$action->isStandalone() && $action->isDropDown() && $action->isShowForRecord($record);
        });
    }

    public function getNonDropDownActionsForRecord($record) {
        return $this->getActionsByFilterForRecord($record, function($action) use($record) {
            return $action->shouldShowIn('inline') && !$action->isStandalone() && !$action->isDropDown() && $action->isShowForRecord($record);
        });
    }

    protected function getActionsByFilterForRecord($record, $filterCallback) {
        $this->initActions(collect([$record]));

        $actionsArray = [];
        foreach ($this->initializedActions as $action) {
            if (call_user_func_array($filterCallback, [$action, $record])) {
                $actionsArray[] = $action->toArrayForDetail($record);
            }
        }
        return $actionsArray;
    }

    protected function actionsArrayForDetail($record) {
        $this->initActions(collect([$record]));

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