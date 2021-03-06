<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\User;
use App\Post;
use App\Measurement;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){

		// Disable foreign key checking because truncate() will fail
		DB::statement('SET FOREIGN_KEY_CHECKS = 0');

		User::truncate();
		Post::truncate();
		Measurement::truncate();

		factory(User::class, 10)->create();
		factory(Post::class, 50)->create();
		factory(Measurement::class, 1000)->create();

		// Admin
		factory(User::class)->create([
			'email' => 'admin@admin.com',
			'is_admin' => 1
		]);

		$this->call('OAuthClientSeeder');

		// Enable it back
		DB::statement('SET FOREIGN_KEY_CHECKS = 1');
	}

}
