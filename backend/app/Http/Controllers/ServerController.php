<?php 

namespace App\Http\Controllers;

use App\Measurement;

use Illuminate\Http\Request;

class ServerController extends Controller{

	public function index(){
		$root = '/';

		$data = [
			'free_space' => disk_free_space($root),
			'total_space' => disk_total_space($root),
			'memory_usage' => memory_get_usage(),
			'total_memory' => memory_get_peak_usage(),
			'cpu_usage' => sys_getloadavg()[0],
			'ip' => $_SERVER['REMOTE_ADDR']
		];

		return $this->success($data, 200);
	}
}