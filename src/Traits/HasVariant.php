<?php
namespace Addons\AntFusion\Traits;

trait HasVariant
{
    use HasMeta;
    
    public function primary($primary = true)
    {
        return $this->meta(['variant' => 'primary']);
    }
}