<?php
namespace Addons\AntFusion\Traits;

trait HasVariant
{
    use HasMeta;
    
    public function primary()
    {
        return $this->meta(['variant' => 'primary']);
    }
}