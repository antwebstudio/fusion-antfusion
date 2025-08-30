<?php
namespace Addons\AntFusion\Fieldtypes;

use Fusion\Models\Field;

class SoftDeleted extends \Fusion\Fieldtypes\Fieldtype
{
    /**
       * @var string
       */
    public $name = 'Soft Deleted At';

    /**
     * @var string
     */
    public $icon = 'cog';

    /**
     * @var string
     */
    public $description = 'Soft Delete.';

    public $relationship = 'column';

    /**
     * @var string
     */
    public $cast = 'datetime';

    /**
     * @var array
     */
    public $column = [
        'type' => 'datetime',
    ];

    /**
     * @var array
     */
    public $traits = [
        \Illuminate\Database\Eloquent\SoftDeletes::class,
    ];

    public function generateRelationship($field)
    {
        $stub = 'public function getDeletedAtColumn() { return "{handle}"; }';

        return strtr($stub, [
            '{handle}' => $field->handle,
        ]);
    }
    
    public function persistRelationship() {}
}
