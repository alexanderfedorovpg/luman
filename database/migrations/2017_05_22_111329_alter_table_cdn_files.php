<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableCdnFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cdn_files', function (Blueprint $table) {
            $table->string('object_source')->nullable();
            $table->string('object_author')->nullable();
            $table->string('object_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cdn_files', function (Blueprint $table) {
            $table->dropColumn('object_source');
            $table->dropColumn('object_author');
            $table->dropColumn('object_name');
        });
    }
}
