<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Http\Request;
use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanView {
    public function viewMeta($resourceId) {
        $model = $this->model()->withoutGlobalScopes()->find($resourceId);

        return [
            'title' => $this->getEditTitle($model),
            'subtitle' => $this->getEditSubtitle($model),
            'resource' => new ResourceResource($this),
            'record' => $this->getEditRecord($model),
            'actions' => $this->getEditPageActions($model),
            'fields' => $this->flatternFieldsArray('view'),
            'children' => $this->fieldsArray('view'),
        ];
    }
}