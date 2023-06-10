<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class CustomAction extends Action {
    protected $callback;
    protected $standalone = true;
    protected $successMessage = 'Action performed successfully.';
    protected $component = 'action-button';

    public function __construct($name, $callback)
    {
        $this->confirmText('Are you sure you want to perform this action?');
        $this->confirmButtonText('Confirm');

        $this->name = $name;
        $this->callback = $callback;
    }

    public function handle($request, $entries) {
        if (is_callable($this->callback)) {
            call_user_func_array($this->callback, [$request, $entries]);
        }
        return [
            'message' => $this->successMessage,
        ];
    }
}