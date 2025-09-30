<?php

namespace Addons\AntFusion\Services;

use Addons\AntFusion\Resource;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class ExcelExport extends DefaultValueBinder implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithEvents, WithCustomValueBinder, WithStrictNullComparison, WithStyles
{
    use \Maatwebsite\Excel\Concerns\Exportable;
    use RegistersEventListeners;

    protected $resource;

    public function __construct(Resource $resource)
    {
        $this->resource = $resource;
    }
    
    public function bindValue(Cell $cell, $value)
    {
        // if (is_numeric($value)) {
        // ray($value)->blue();
            $cell->setValueExplicit($value, DataType::TYPE_STRING);

            return true;
        // }

        // else return default behavior
        return parent::bindValue($cell, $value);
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

    public function styles($sheet)
    {
        // Apply wrap text to the entire sheet
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        $range = "A1:{$highestColumn}{$highestRow}";

        $sheet->getStyle($range)
              ->getAlignment()
              ->setWrapText(true);
        
        return [];
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
