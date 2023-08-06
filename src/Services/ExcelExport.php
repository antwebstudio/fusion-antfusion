<?php

namespace Addons\AntFusion\Services;

use Addons\AntFusion\Resource;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;

class ExcelExport implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithEvents
{
    use RegistersEventListeners;

    protected $resource;

    public function __construct(Resource $resource)
    {
        $this->resource = $resource;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $cellRange = $this->getHeadingRange(); // All headers
                if (isset($cellRange)) {
                    $event->sheet
                        ->getStyle($cellRange)
                        ->getAlignment()
                        ->setWrapText(true);
                }
            },
        ];
    }

    protected function getHeadingRange()
    {
        $columnName = $this->excelColumnFromNumber(count($this->headings()));
        if ($columnName) {
            return 'A1:'.$columnName.'1';
        }
    }

    protected function excelColumnFromNumber($columnNumber) {
        $columnName = '';
        while ($columnNumber > 0) {
            $remainder = ($columnNumber - 1) % 26;
            $columnName = chr(65 + $remainder) . $columnName;
            $columnNumber = intdiv($columnNumber - $remainder, 26);
        }
        return $columnName;
    }    

    public function headings(): array
    {
        return $this->resource->exportToExcelHeadings();
    }

    public function map($response): array
    {
        return $this->resource->exportToExcelMap($response);
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        //
        return $this->resource->exportToExcelQuery();
    }
}
