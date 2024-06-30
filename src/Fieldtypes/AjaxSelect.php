<?php
namespace Addons\AntFusion\Fieldtypes;

use Fusion\Models\Field;

class AjaxSelect extends \Fusion\Fieldtypes\Fieldtype
{
    /**
       * @var string
       */
    public $name = 'Ajax Multiselect';

    /**
     * @var string
     */
    public $icon = 'i-cursor';

    /**
     * @var string
     */
    public $cast = 'array';

    /**
     * @var array
     */
    public $column = [
        'type' => 'text',
    ];

    /**
     * @var string
     */
    public $description = 'Ajax Multiselect.';

    public function persistRelationship($model, Field $field)
    {  
        $oldValues = collect($model->{$field->handle})->pluck('id');
        $newValues = collect(request()->input($field->handle))->pluck('id');

        $model->{$field->handle}()->detach($oldValues);
        $model->{$field->handle}()->attach($newValues);
    }
}
