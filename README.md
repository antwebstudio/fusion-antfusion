## Introduction

Addon built for FusionCMS ([beta.getfusioncms.com](http://beta.getfusioncms.com)), inspired by Laravel Nova ([nova.laravel.com](http://nova.laravel.com)).

## Installation

```bash
composer require antweb/fusion-antfusion
```

Then, create a folder `AntFusion` under the `app` folder.

Then, create a file `Resource.php` inside the `AntFusion` folder, by copy the following code:

```php
<?php
namespace App\AntFusion;

abstract class Resource extends \Addons\AntFusion\Resource {
}
```

## Basic Usage

1. Create a new resource file:
    
    ```php
    <?php
    namespace App\AntFusion;
    
    use App\Models\User;
    use Addons\AntFusion\Fields\Fusion as FusionField;
    
    class NewResource extends Resource
    {
        protected $model = User::class; // Model class of the resurce
        protected $clickColumnHandle = 'name';
    
        public function fields() {
            return [
                FusionField::make('Name', 'name')->asName(),
            ];
        }
    
        public function actions() {
            return [
                // \Addons\AntFusion\Actions\Create::make()->primary(),
                new \Addons\AntFusion\Actions\Edit,
            ];
        }
    }
    ```
    
2. Put this line in `AppServiceProvider` or any service provider that you prefer:
    
    ```php
    (new \App\AntFusion\NewResource)->register();
    ```
    
3. Login to FusionCMS admin panel and you should able to see a new page on menu.

## Route

1. Register route for Page or Resource
    
    ```bash
    Route::antfusionAdmin('/path', App\AntFusion\TestPage::class);
    
    // OR
    
    Route::antfusionAdmin('/path', App\AntFusion\TestResource::class);
    ```
    

## Resource

1. Change URL slug for resource
    
    ```php
    class NewResource extends Resource
    {
    	protected $slug = 'user-list';
    }
    ```
    
2. Change icon for resource
    
    ```php
    class NewResource extends Resource
    {
    	protected $icon = 'users';
    }
    ```
    
3. Change page title for resource
    
    ```php
    class NewResource extends Resource
    {
    	protected $name= 'Users';
    }
    ```
    

## Page

1. Create a new Page class:
    
    ```php
    <?php
    namespace App\AntFusion\Pages;
    
    class NewPage extends \Addons\AntFusion\Page
    {
    		public function components() {
            return [
    						
    				];
        }
    }
    ```
    

## Actions

1. Create a new Action class
    
    ```php
    <?php
    namespace App\AntFusion\Actions;
    
    use Addons\AntFusion\Action;
    
    class NewAction extends Action
    {
    	// protected $name = 'Custom Label Name';
    
    	// protected $standalone = true; // For non-inline action
    
    	public function handle($request, $entries) {
    		// $entry = $entries->first(); // For inline action
    	}
    }
    ```
    
2. Add action to Resource / Page
    
    ```php
    public function actions() {
    	return [
    		new \App\AntFusion\Actions\NewAction
    	];
    }
    
    // OR (with confirmation message)
    public function actions() {
    	return [
    		(new \App\AntFusion\Actions\NewAction)->confirmText('Are you sure?'),
    	];
    }
    ```
    

### Load record properties

To load record properties value to Action fields

```php
class NewAction extends Action
{
		public function __construct() {
        $this->withMeta(['load_record' => [
            'name' => 'name',
            'contact_number' => 'profile.contact_number',
        ]]);
    }

		public function fields() {
        return [
            Fusion::make('Name', 'name')->type('input'),
            Fusion::make('Contact Number', 'contact_number')->type('input'),
        ];
    }
}
```

### Link

Simple link

```php
use Addons\AntFusion\Actions\Link;

Link::make('View', '/resource/user-list/view')->onlyInline();
```

Link base on model

```php
use Addons\AntFusion\Actions\Link;

Link::make('View', function($model) {
    return '/resource/user-list/'.$model->id.'/user-detail';
})->onlyInline(),
```

## Filter

Define a new Filter

```php
<?php
namespace App\AntFusion\Filters;

use Addons\AntFusion\Filter;

class BookFilter extends Filter
{
    const LISTED = 'listed';
    const DELISTED = 'delisted';

    public function apply($request, $query, $value) {
        if ($value == static::LISTED) {
            $query->listed();
        } else if ($value == static::DELISTED) {
            $query->delisted();
        } else {
            $query->listed();
        }
    }

    public function options($request)
    {
        return [
            'Listed' => static::LISTED,
            'Delisted' => static::DELISTED,
        ];
    }
}
```

Register a Filter to Resource

```php
public function filters()
{
    return [
        new \App\AntFusion\Filters\BookFilter,
    ];
}
```

## Components

### Metric Card

Define a new Metric Card

```php
<?php
namespace App\AntFusion\Metrics;

use Addons\AntFusion\Components\MetricCard;

class Balance extends MetricCard
{
    public function __construct() {
        $this->label('Balance')->icon('minus');
    }

    public function calculate()
    {
        return $this->query()->sum('debit') - $this->query()->sum('credit');
    }
}
```

Register a Metric Card to resource

```php
public function metrics()
{
    return [
        new \App\AntFusion\Metrics\Balance,
    ];
}
```

### Panel

```php
use Addons\AntFusion\Components\Panel;

public function fields() {
    return [
        Panel::make('', [
					// Fields inside panel
				]),
		]
}
```

Set width for panel

```php
[
	Panel::make('', [
		// Fields inside panel
	])->width('2/3'),

	Panel::make('', [
		// Fields inside panel
	])->width('1/3'),
]
```

## Todo

- Enhance documentation
- Add feature to customize dashboard (high priority)
- Add access control/authorization
- Add relationship field
- Add metrics
- Add feature to build settings pages
- Add impersonation (low priority)
