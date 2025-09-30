<?php

namespace Addons\AntFusion\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ExportDone extends Notification
{
    use Queueable;

    protected $filename;

    protected $disk;

    protected $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($filename, $disk, $message = null)
    {
        //
        $this->message = $message ?? 'Your export has completed.'; // TODO: Enhance message, for eg: Your cake step export has completed and 2 rows exported.
        $this->filename = $filename;
        $this->disk = $disk;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
            'filename' => $this->filename,
            'disk' => $this->disk,
            'body' => $this->message,
            'status' => 'success',
            'title' => 'Export completed',
        ];
    }
}
