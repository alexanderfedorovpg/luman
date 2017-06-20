<?php
/**
 * Created by PhpStorm.
 * User: shakinm@gmail.com
 * Date: 20.06.2017
 * Time: 11:27
 */

namespace App\Http\Controllers\v1;


use App\Filespot\Request;
use App\Models\Settings;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Mockery\Exception;
use Illuminate\Support\Facades\Validator;

/**
 * Class SettingsController
 * @package app\Http\Controllers\v1
 */
class SettingsController extends CmsController
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            return $this->respond(Settings::all());
        } catch (ModelNotFoundException $e) {
            $this->respondNotFound($e->getMessage());
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        try {
            $validation = Validator::make(
                ['id' => $id],
                [
                    'id' => 'required|numeric|exists:settings,id',

                ]
            );

            if ($validation->fails()) {

                throw new ValidationException($validation->errors()->all());
            }

           return $this->respond(Settings::find($id)->toArray());

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->validator);
        } catch (Exception $e) {
            $this->respondFail500x($e->getMessage());
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function store(Request $request)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string',
                    'description' => 'required|string',
                    'value' => 'required',
                ]
            );

            if ($validation->fails()) {

                throw new ValidationException($validation->errors()->all());
            }

            $settings = new Settings();
            $settings->name = $request->input('name');
            $settings->description = $request->input('description');
            $settings->value = $request->input('value');

            if ($request->input('value')) {
                $settings->type = $request->input('value');
            }

            if ($settings->save()) {
                return $this->respond($settings->toArray());
            }

            throw new \Exception('Запись не создана');

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->validator);
        } catch (Exception $e) {
            $this->respondFail500x($e->getMessage());
        }
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function update($id, Request $request)
    {
        try {
            $validation = Validator::make(
                $request->merge(['id' => $id])->all(),
                [
                    'id' => 'required|numeric|exists:settings,id',
                    'name' => 'required|string',
                    'description' => 'required|string',
                    'value' => 'required',
                ]
            );

            if ($validation->fails()) {

                throw new ValidationException($validation->errors()->all());
            }

            $settings = Settings::find($id);
            $settings->name = $request->input('name');
            $settings->description = $request->input('description');
            $settings->value = $request->input('value');

            if ($request->input('value')) {
                $settings->type = $request->input('value');
            }

            if ($settings->save()) {
                return $this->respond($settings->toArray());
            }

            throw new \Exception('Ошибка сохранения.');

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->validator);
        } catch (Exception $e) {
            $this->respondFail500x($e->getMessage());
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        try {
            $validation = Validator::make(
                ['id' => $id],
                [
                    'id' => 'numeric|exists:settings,id',

                ]
            );

            if ($validation->fails()) {

                throw new ValidationException($validation->errors()->all());
            }

            if (Settings::destroy($id)) {
                return $this->respond('success');
            }

            throw new \Exception('Ошибка удаления.');

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->validator);
        } catch (Exception $e) {
            $this->respondFail500x($e->getMessage());
        }
    }


}