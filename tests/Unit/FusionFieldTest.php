<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Fusion\Models\Field;
use Fusion\Models\Section;
use Fusion\Models\Blueprint;
use Ant\FusionHelper\Helpers\Fusion as FusionHelper;
use Addons\AntFusion\Fields\Fusion as FusionField;

class FusionFieldTest extends TestCase
{
    public function test() {
        $fieldHandle = 'test_'.uniqid();
        $matrix = FusionHelper::createCollection('Test Matrix', 'test_'.uniqid(), [
            [
                'name' => 'Test Field',
                'handle' => $fieldHandle,
                'type' => 'input',
            ],
        ]);
        $fusionField = $matrix->fields->first();

        $field = FusionField::makeFromField($fusionField)->toArray();
    }
}