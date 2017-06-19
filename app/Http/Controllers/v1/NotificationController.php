<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\ApiController;
use Davibennun\LaravelPushNotification\Facades\PushNotification;
use Sly\NotificationPusher\Adapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\News;
use App\Models\Device;
use Mockery\Exception;

class NotificationController extends CmsController
{


    /**
     * @param array $tokens
     * @param null $message
     * @param array|null $data
     * @return array
     */
    protected function sendFCM(array $tokens, $message = null, array $data = null)
    {

        try {
            $devices = array_map(function ($token) {
                return PushNotification::Device($token);
            }, $tokens);


            $devices = PushNotification::DeviceCollection($devices);

            $message = PushNotification::Message($message, $data);
            $collection = PushNotification::App(
                [
                    'environment' => 'production',
                    'apiKey' => 'AAAAQBfCgTM:APA91bH1eB1w_xiOXDN-tar2S_j7uNeRUItrci_JJYbhqTEflFJGVnHHrgRJgmbQvGtDcSpeX0LMZzMbugkdZFDPiZoitqLS3IG_EQPonruNJZvOZinKDR3B7Bioy0NaGzlMmp9KNXzj',
                    'service' => 'gcm'
                ]
            )
                ->to($devices)
                ->send($data);

            $response = [];
            foreach ($collection->pushManager as $push) {
                $response[] = $push->getAdapter()->getResponse();
            }

            return  $response;
        } catch (Exception $e) {
            $this->respondFail500x($e->getMessage());
        }

    }


    function sendAPNS(array $tokens, $message = null, array $data = null)
    {

        try {
            $devices = array_map(function ($token) {
                return PushNotification::Device($token);
            }, $tokens);

            $devices = PushNotification::DeviceCollection($devices);
            $message = PushNotification::Message($message, $data);
            $collection = PushNotification::app(
                [
                    'environment' => 'production',
                    'certificate' => '/path/to/certificate.pem',
                    'passPhrase' => 'password',
                    'service' => 'apns'
                ]
            )
                ->to($devices)
                ->send($data);

            $response = [];
//            foreach ($collection->pushManager as $push) {
//                $response[] = $push->getAdapter()->getResponse();
//            }

            return $this->respondAccepted($response);
        } catch (Exception $e) {
            $this->respondFail500x();
        }

    }

    /**
     * Отправить пуш-уведомление по id новости
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function sendMessage($id)
    {


        try {
            $news = News::whereId($id)->firstOrFail();

            $messageAndroid = [
                'title' => $news->title,
                'body' => $news->body,
                'icon' => 'ic_notif',
                'data' => [
                    'news_id' => $news->id
                ]
            ];
            $messageIos = [
                'title' => $news->title,
                'body' => $news->body,
                'icon' => 'ic_notif',
                'data' => [
                    'news_id' => $news->id
                ]
            ];
            $tokens = Device::all()->chunk(100)->chunk(100, function ($tokens) use ($news, $messageAndroid, $messageIos) {
                $tokensFCM = $tokensAPNS = [];
                foreach ($tokens as $token) {
                    if ($token == 'adnroid') {
                        $tokensFCM[] = $token->guid;

                    } elseif ($token == 'iphone') {
                        $tokensIos[] = $token->guid;
                    }
                }
                $this->sendFCM($messageAndroid, $news->title, $tokensFCM);
                $this->sendAPNS($messageIos, $news->title, $tokensAPNS);
            });


            return $this->respondAccepted();
        } catch (Exception $e) {
            return $this->respondNotFound($e->getMessage());
        }

    }

    public function addDevice(Request $request)
    {

        $device = new Device;
        $device->guid = $request->input('guid');
        $device->device = $request->input('device');
        if ($device->save()) {
            return $this->respondCreated(['success' => true]);
        }

        return $this->respondFail500x();
    }

    /**
     * @param $guid
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeDevice($guid)
    {

        $device = Device::where('guid', '=', $guid);
        if ($device) {
            return $this->respond(['success' => $device->delete()]);
        }

        return $this->respondNotFound('Device is not found');


    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendOneMessage(Request $request)
    {

        try {


            $messageAndroid = [
                'title' => $request->title,
                'body' => $request->body,
                'icon' => 'ic_notif',

            ];
            $messageIos = [
                'title' => $request->title,
                'body' => $request->body,


            ];
            $tokens = Device::all()->chunk(100)->chunk(100, function ($tokens) use ($request, $messageAndroid, $messageIos) {
                $tokensFCM = $tokensAPNS = [];
                foreach ($tokens as $token) {
                    if ($token == 'adnroid') {
                        $tokensFCM[] = $token->guid;

                    } elseif ($token == 'iphone') {
                        $tokensIos[] = $token->guid;
                    }
                }
                $this->sendFCM($messageAndroid, $request->title, $tokensFCM);
                $this->sendAPNS($messageIos, $request->title, $tokensAPNS);
            });


            return $this->respondAccepted();
        } catch (Exception $e) {
            return $this->respondNotFound($e->getMessage());
        }

    }

    /**
     * Отправить определенным пуш-уведомление с body и title
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMessageToFCM(Request $request)
    {

        $tokens = $request->tokens;
        $message = array(
            'title' => $request->title,
            'body' => $request->body
        );


         $this->sendFCM($tokens, 'test', $message);

        $this->respond(['Accepted']);
    }

    public function sendMessageToAPNS(Request $request)
    {

        $tokens = $request->tokens;
        $message = array(
            'title' => $request->title,
            'body' => $request->body
        );


        $fcmRespond = $this->sendAPNS($tokens, 'test', $message);


    }

}


