<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class Restore extends Action {
    protected $name = 'Restore';

    protected $destructive = false;
    
    protected $dropdown = true;

    public function __construct()
    {
        $this->confirmText('Are you sure you want to restore this?');
        $this->confirmTitle('Restore record?');
        $this->confirmButtonText('Restore');
    }

    public function handle($request, $entries) {
        activity()->withoutLogs(function () use($entries) {
            $entries->each(function ($entry) {
                $entry->restore();
            });
        });
        return [
            'message' => 'Restored successfully.'
        ];
    }
}