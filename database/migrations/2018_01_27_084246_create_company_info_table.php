<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_info', function(Blueprint $table) {
            $table->increments('id');
            $table->text('name');
            $table->text('phone');
            $table->string('fax', 50);
            $table->text('email')->nullable();
            $table->text('website')->nullable();
            $table->text('address')->nullable();
            $table->text('facebook')->nullable();
            $table->text('facebook_message')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_info');
    }
}
