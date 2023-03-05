<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class Delete extends Action {
    protected $name = 'Delete';

    protected $destructive = true;
    
    protected $successMessage = 'Deleted successfully';

    public function __construct()
    {
        $this->confirmText('Are you sure you want to delete this?');
        $this->confirmTitle('Delete record?');
        $this->confirmButtonText('Delete');
    }

    public function handle($request, $entries) {
        activity()->withoutLogs(function () use($entries) {
            $entries->each(function ($entry) {
                $entry->delete();
            });
        });
        return [
            'message' => $this->successMessage,
        ];
    }
}