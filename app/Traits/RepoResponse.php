<?php
namespace App\Traits;

trait RepoResponse {

    private $version = ['version' => '1.0'];
    public function formatResponse(bool $status, string $msg, string $redirect_to, $data = null, string $flash_type = '',$id = null) : object
    {

        if ($flash_type == '') {
            $flash_type = $status ? 'success' : 'error';
        }

        return (object) array(
            'status'         => $status,
            'msg'            => $msg,
            'description'    => $msg,
            'data'           => $data,
            'id'             => $id,
            'redirect_to'    => $redirect_to,
            'redirect_class' => $flash_type
        );
    }

    public function ajaxResponse(int $code, string $msg, $data = null, int $status = 1, string $description = '') : object
    {
        return (object) array(
            'status'        => $status,
            'success'       => true,
            'code'          => $code,
            'message'       => $msg,
            'description'   => $description,
            'data'          => $data,
            'errors'        => null,
            'api'           => $this->version
        );
    }

    public function errorResponse(int $code, string $msg, $errors = null, int $status = 0, string $description = '') : object
    {
        return (object) array(
            'status'    => $status,
            'success'   => false,
            'code'      => $code,
            'message'   => $msg,
            'description' => $description,
            'data'      => null,
            'errors'    => $this->getFormattedErrors($code, $errors, $msg),
            'api'       => $this->version
        );
    }

    private function getFormattedErrors(int $code, $errors, string $reason = '', string $description = '') : object
    {
        if ($description == '') {
            $description = $reason;
        }

        return (object) [
            'fields'        => $errors,
            'error_as_string' => $this->getErrorAsString($errors),
            'reason'        => $reason,
            'description'   => $description,
            'error_code'    => $code,
            'link'          => ''
        ];
    }

    private function getErrorAsString($errors) : string {
        $errorString ="";

        foreach ((array) $errors as $error) {

            if (is_array($error)) {
                foreach ($error as $e) {
                    $errorString .= $e[0] . ",";
                }

                $errorString = substr($errorString, 0, -1);
                break;

            } else {
                $errorString .= "";
            }
        }

        return $errorString;
    }

}
