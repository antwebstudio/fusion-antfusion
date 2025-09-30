<?php
namespace Addons\AntFusion\Jobs;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class NotifyUserOfCompletedExport implements ShouldQueue
{
    use Queueable, SerializesModels;
    
    public $user;

    public $filename;

    public $disk;

    public $message;
    
    public function __construct($user, $filename, $disk)
    {
        $this->user = $user;
        $this->filename = $filename;
        $this->disk = $disk;
    }

    public function setNotification($message)
    {
        $this->message = $message;
        return $this;
    }

    public function handle()
    {
        $this->user->notify(new \Addons\AntFusion\Notifications\ExportDone($this->filename, $this->disk, $this->message));
    }
}