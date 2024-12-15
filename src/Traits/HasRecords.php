<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Support\Str;
use Addons\AntFusion\Components\Panel;

trait HasRecords {
    protected $records;

    public function getRecords()
    {
        return $this->records;
    }

    public function setRecords($records)
    {
        $this->records = $records;
        return $this;
    }
}