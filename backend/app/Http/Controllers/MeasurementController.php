<?php 

namespace App\Http\Controllers;

use App\Measurement;

use Illuminate\Http\Request;

class MeasurementController extends Controller{

	public function index(Request $request){
		$from = $request->get('from', false);
		$to = $request->get('to', false);

		if($from &&$to) {
			$list = Measurement::query()
							->where('date', '>', date('Y-m-d H:i:s', strtotime($from)))
							->where('date', '<', date('Y-m-d H:i:s', strtotime($to)))
							->orderBy('date', 'desc')
							->get();
		} else {
			$list = Measurement::query()
							->orderBy('date', 'desc')
							->get();
		}
		return $this->success($list, 200);
	}

	public function store(Request $request){

		$this->validateRequest($request);

		$measurement = Measurement::create([
					'title' => $request->get('title'),
					'content'=> $request->get('content'),
					'user_id' => $this->getUserId()
				]);

		return $this->success("The Measurement with with id {$measurement->id} has been created", 201);
	}

	public function show($id){

		$measurement = Measurement::find($id);

		if(!$measurement){
			return $this->error("The Measurement with {$id} doesn't exist", 404);
		}

		return $this->success($measurement, 200);
	}

	public function destroy($id){

		$measurement = Measurement::find($id);

		if(!$measurement){
			return $this->error("The Measurement with {$id} doesn't exist", 404);
		}

		// no need to delete the comments for the current Measurement,
		// since we used on delete cascase on update cascase.
		// $measurement->comments()->delete();
		$measurement->delete();

		return $this->success("The Measurement with with id {$id} has been deleted along with it's comments", 200);
	}

	public function validateRequest(Request $request){

		$rules = [
			'value' => 'required', 
			'unit' => 'required', 
			'type' => 'required', 
			'date' => 'required'
		];

		$this->validate($request, $rules);
	}
}