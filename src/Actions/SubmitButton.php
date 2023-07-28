<?php
namespace Addons\AntFusion\Actions;

use Addons\AntFusion\Action;

class SubmitButton extends Action {
    protected $callback;
    protected $standalone = true;
    protected $successMessage = 'Record saved successfully.';
    protected $component = 'submit-button';

    public function __construct($name, $callback)
    {
        // $this->confirmText('Are you sure you want to perform this action?');
        // $this->confirmButtonText('Confirm');

        $this->name = $name;
        $this->callback = $callback;
    }

    public function handle($request, $entries) {
        if (is_callable($this->callback)) {
            $response = call_user_func_array($this->callback, [$request, $entries]);
        }
        if (isset($response)) {
            return $response;
        }
        return [
            'message' => $this->successMessage,
        ];
    }
}