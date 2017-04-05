<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            return response('Unauthorized.', 401);
        }

        list($controller, $action) = $this->parseRequestRoute($request->route());
        if ($this->auth->guard($guard)->user()->canRoute($controller, $action)) {
            return $next($request);
        }

        return response('Unauthorized.', 401);
    }

    /**
     * Костыль для получения вызываемого контроллера и экшена
     * TODO: Выпилить! Не нашел способа как получить текущей роут
     *
     * @param array $routeParams
     * @return array
     */
    private function parseRequestRoute(array $routeParams)
    {
        $route = null;
        foreach ($routeParams as $param) {
            if (isset($param['uses'])) {
                $route = $param['uses'];
            }
        }

        list($controller, $action) = explode('@', $route);
        if (!$controller || !$action) {
            return ['', ''];
        }

        return [$controller, $action];
    }
}
