<?php

use Illuminate\Database\Seeder;

class OAuthClientSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){

		DB::table('oauth_clients')->truncate();

		DB::table('oauth_clients')->insert(
				[   'id' => "1",
					'secret' => "client_secret",
					'name' => "Test Client 1"
				]
			);
	}
}
