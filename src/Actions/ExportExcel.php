<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Resource;
use Maatwebsite\Excel\Facades\Excel;

class ExportExcel extends \Addons\AntFusion\Action
{
    // use \Addons\AntFusion\Traits\EvaluatesClosures;

    protected $name = 'Export Excel';
    protected $standalone = true;
    
    protected $exporter;
    protected $filename;
    protected $download = false;
    protected $successMessage;

    protected $disk = 'local_public';

    public function __construct($filename = null, $exporter = null)
    {
        $this->exporter = $exporter;
        $this->filename = $filename;
    }

    public function downloadDirectly() {
        $this->download = true;
        return $this->withMeta(['blob' => true]);
    }

    public function setSuccessMessage($successMessage)
    {
        $this->successMessage = $successMessage;
        return $this;
    }

    public function handle($request, $models)
    {
        $exporter = is_callable($this->exporter) ? call_user_func_array($this->exporter, [$request, $models]) : $this->exporter;
        if ($exporter instanceof Resource) {
            if ($this->download) {
                $exporter = new \Addons\AntFusion\Services\ExcelExport($exporter);
            } else {
                $this->filename = uniqid().'-'.$this->filename;
                $exporter = new \Addons\AntFusion\Services\QueuedExcelExport($exporter->forQueuedExporter());
            }
        }

        if ($exporter instanceof \Illuminate\Contracts\Queue\ShouldQueue) {
            $exporter->queue($this->filename, $this->disk)->chain([
                (new \Addons\AntFusion\Jobs\NotifyUserOfCompletedExport(auth()->user(), $this->filename, $this->disk))->setNotification($this->successMessage),
            ]);
            return [
                'message' => 'Export is started, you will get notification will it is done.',
            ];
        } else {
            return Excel::download($exporter, $this->filename);
        }
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