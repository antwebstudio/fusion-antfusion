<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Resource;
use Maatwebsite\Excel\Facades\Excel;

class ExportExcel extends \Addons\AntFusion\Action
{
    protected $name = 'Export Excel';
    protected $standalone = true;
    
    protected $exporter;
    protected $filename;

    public function __construct($filename = null, $exporter = null)
    {
        $this->exporter = $exporter;
        $this->filename = $filename;

        $this->withMeta(['blob' => true]);
    }

    public function handle($request, $models)
    {
        $exporter = is_callable($this->exporter) ? call_user_func_array($this->exporter, [$request, $models]) : $this->exporter;
        if ($exporter instanceof Resource) {
            $exporter = new \Addons\AntFusion\Services\ExcelExport($exporter);
        }
        return Excel::download($exporter, $this->filename);
    }

    public function fields() {
        return [
        ];
    }

    public function toArray() {
        $array = parent::toArray();
        unset($array['to']);
        return $array;
    }
}