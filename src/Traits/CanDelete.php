<?php
namespace Addons\AntFusion\Traits;

use Addons\AntFusion\Http\Resources\ResourceResource;

trait CanDelete {
    public function delete($request) {
        $model = $this->model()->find($request->resourceId);
        $model->delete();
    }

    public function forceDelete($request) {
        $model = $this->model()->find($request->resourceId);
        $model->forceDelete();
    }
}