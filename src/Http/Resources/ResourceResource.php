<?php
namespace Addons\AntFusion\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceResource extends JsonResource
{
    public function toArray($request) 
    {
        return [
            'slug' => $this->getSlug(),
            'icon' => $this->getIcon(),
        ];
    }
}